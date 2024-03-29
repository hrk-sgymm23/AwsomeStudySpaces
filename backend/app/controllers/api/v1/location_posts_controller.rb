class Api::V1::LocationPostsController < ApplicationController
    before_action :set_location_post, only: [:show, :update, :destroy]

    def index
        @location_posts = LocationPost.all
        render json: @location_posts, status: :ok
    end

    def show
        if @location_post.location_image.attached?
            location_image = rails_blob_path(@location_post.show_location_image)
            render json: @location_post.as_json.merge(location_image: location_image), status: :ok
        else
            render json: @location_post, status: :ok
        end
        
    end

    def create
        if @location_post = LocationPost.create!(location_post_params)
            render json: @location_post, status: :created
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
            render json: @location_post, status: :no_content
        else
            render json: { error: 'Failed to delete resource' }, status: :unprocessable_entity
        end
    end

    def get_users_posts
        if @user = User.find(params[:id])
            @location_posts = @user.location_posts
            render json: @location_posts, status: :ok 
        else
            render json: { error: 'not exit user' }, status: :bad_request
        end
    end

    private
        def set_location_post
            @location_post = LocationPost.find(params[:id])
        end

        def location_post_params
            params.require(:location_post).permit(:title, :description, :address, :user_id, :location_image)
        end
end