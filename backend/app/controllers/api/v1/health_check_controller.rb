class Api::V1::HealthCheckController < ApplicationController
    def index
      logger.info "============================================================"
      logger.info "RequestUrl: #{request.url}"
      render json: { status: 200 }, status: 200
    end
end