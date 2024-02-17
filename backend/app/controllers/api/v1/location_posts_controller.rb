class Api::V1::LocationPostsController < ApplicationController
    before_action :set_location_post, only: [:show, :update, :destroy]

    def index
        @location_posts = LocationPost.all
        render json: @location_posts, status: :ok
    end

    def show
        render json: @location_post, status: :ok
    end

    def create
        @location_post = LocationPost.new(location_post_params)
        if @location_post.save
            render json: @location_post, status: :ok
        else
            render json: @location_post.errors, status: :bad_request
        end
    end

    def update
        if @location_post.update(location_post_params)
            render json: @location_post, status: :ok
        else
            render json: @location_post.errors, status: :bad_request
        end
    end

    def destroy
        if @location_post.destroy
            render json: @location_post, status: :ok
        else
            render json: { error: 'Failed to delete resource' }, status: :unprocessable_entity
        end
    end

    private
        def set_location_post
            @location_post = LocationPost.find(params[:id])
        end

        def location_post_params
            params.require(:location_post).permit(:title, :description, :address)
        end
end