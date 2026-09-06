require "pdf-reader"

class ResumeTextExtractor
  class MissingResumeError < StandardError; end
  class EmptyResumeError < StandardError; end

  def self.call(application)
    document = application.document
    unless document&.file&.attached?
      raise MissingResumeError, "Resume is not attached"
    end

    text = document.file.open do |file|
      PDF::Reader.new(file.path).pages.map(&:text).join("\n")
    end

    if text.strip.empty?
      raise EmptyResumeError, "Resume contains no extractable text"
    end

    text
  end
end
