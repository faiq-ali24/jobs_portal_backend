class CandidateMatchScorer
  VERSION = "v1".freeze

  WEIGHTS = {
    required_skills: 40,
    preferred_skills: 10,
    experience: 25,
    title: 15,
    education: 5,
    location: 5
  }.freeze

  TITLE_STOP_WORDS = %w[junior senior lead jr sr].freeze

  def initialize(application:, resume_text:)
    @application = application
    @job = application.job
    @resume_text = normalize(resume_text)
  end

  def call
    assessments = {
      required_skills: skill_assessment(@job.required_skills),
      preferred_skills: skill_assessment(@job.preferred_skills),
      experience: experience_assessment,
      title: title_assessment,
      education: nil,
      location: location_assessment
    }
    components = assessments.compact

    available_weight = components.sum { |name, _| WEIGHTS.fetch(name) }
    weighted_points = components.sum do |name, assessment|
      assessment.fetch(:ratio) * WEIGHTS.fetch(name)
    end
    score = if available_weight.zero?
              0.0
            else
              (weighted_points / available_weight * 100).round(2)
            end

    {
      score: score,
      breakdown: {
        version: VERSION,
        total: score,
        available_weight: available_weight,
        excluded_components: assessments.select { |_, value| value.nil? }.keys,
        components: component_breakdown(components)
      }
    }
  end

  private

  def skill_assessment(skills)
    expected = Array(skills).filter_map do |skill|
      normalized = normalize(skill)
      normalized unless normalized.empty?
    end.uniq
    return nil if expected.empty?

    matched, missing = expected.partition { |skill| phrase_present?(skill) }

    {
      ratio: matched.length.to_f / expected.length,
      matched: matched,
      missing: missing
    }
  end

  def experience_assessment
    required_years = @job.minimum_experience_years&.to_f
    return nil unless required_years&.positive?

    candidate_years = @application.yoe.to_f

    {
      ratio: [[candidate_years / required_years, 0.0].max, 1.0].min,
      candidate_years: candidate_years,
      required_years: required_years
    }
  end

  def title_assessment
    expected = normalize(@job.title).split.reject do |word|
      TITLE_STOP_WORDS.include?(word)
    end.uniq
    return nil if expected.empty?

    matched, missing = expected.partition { |word| phrase_present?(word) }

    {
      ratio: matched.length.to_f / expected.length,
      matched_terms: matched,
      missing_terms: missing
    }
  end

  def location_assessment
    job_location = normalize(@job.location)
    candidate_location = normalize(@application.user.location)

    if job_location.include?("remote")
      return {
        ratio: 1.0,
        job_location: job_location,
        candidate_location: candidate_location,
        reason: "Job allows remote work"
      }
    end

    return nil if job_location.empty? || candidate_location.empty?

    exact_match = job_location == candidate_location
    {
      ratio: exact_match ? 1.0 : 0.0,
      job_location: job_location,
      candidate_location: candidate_location,
      reason: exact_match ? "Locations match" : "Locations do not match"
    }
  end

  def phrase_present?(phrase)
    @resume_text.match?(
      /(?<![[:alnum:]])#{Regexp.escape(phrase)}(?![[:alnum:]])/
    )
  end

  def normalize(value)
    value.to_s
         .downcase
         .unicode_normalize(:nfkd)
         .gsub(/[^\p{Alnum}+#.]+/, " ")
         .squeeze(" ")
         .strip
  end

  def component_breakdown(components)
    components.to_h do |name, assessment|
      weight = WEIGHTS.fetch(name)
      details = assessment.merge(
        ratio: assessment.fetch(:ratio).round(4),
        points: (assessment.fetch(:ratio) * weight).round(2),
        maximum: weight
      )

      [name, details]
    end
  end
end
