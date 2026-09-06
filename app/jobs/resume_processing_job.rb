class ResumeProcessingJob < ApplicationJob
  queue_as :resume_processing

  discard_on ActiveJob::DeserializationError

  def perform(application_id)
    application = Application.find(application_id)

    application.update!(scoring_status: "processing", scoring_error: nil)

    resume_text = ResumeTextExtractor.call(application)
    result = CandidateMatchScorer.new(
      application: application,
      resume_text: resume_text
    ).call

    application.update!(
      match_score: result[:score],
      score_breakdown: result[:breakdown],
      scoring_status: "completed",
      scoring_version: CandidateMatchScorer::VERSION,
      scored_at: Time.current,
      scoring_error: nil
    )
  rescue StandardError => error
    application&.update_columns(
      scoring_status: "failed",
      scoring_error: error.message
    )

    raise
  end
end
