class Api::V1::LocationPostsController < ApplicationController
    def index
        location_posts = LocationPost.all
        render json: location_posts, status: :200
    end

    def show
        location_post = LocationPost.find(params[:id])
        render json: location_post, status: :200
    end

    def create
        location_post = LocationPost.new(post_params)
        if location_post.save
            render json: location_post, status: :200
        else
            render json: location_post.errors, status: :400
        end
    end

    private
        def post_params
            params.require(:location_post).permit(:title, :description, :address)
        end


end