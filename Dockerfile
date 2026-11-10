# syntax=docker/dockerfile:1
# Production image for the Rails API. The same image runs both puma (web) and sidekiq.

FROM ruby:3.1.4-slim-bookworm AS base
WORKDIR /app
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_WITHOUT=development:test \
    BUNDLE_PATH=/usr/local/bundle \
    RAILS_LOG_TO_STDOUT=1 \
    BOOTSNAP_CACHE_DIR=/app/tmp/cache
# Runtime libraries only: libpq for the pg gem, libvips for image_processing
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends libpq5 libvips42 && \
    rm -rf /var/lib/apt/lists/*

# Build stage: compilers and headers are needed to build native gems, but not at runtime
FROM base AS build
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libpq-dev libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*
COPY Gemfile Gemfile.lock .ruby-version ./
RUN bundle install && rm -rf "${BUNDLE_PATH}"/ruby/*/cache
COPY . .

FROM base
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app
RUN useradd --create-home rails && \
    mkdir -p tmp/pids log storage && \
    chown -R rails:rails tmp log storage
USER rails
EXPOSE 3001
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
