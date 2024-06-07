require 'rails_helper'

RSpec.describe Api::V1::LocationPostsController, type: :controller do
    describe "GET #index" do
        it "returns a success response" do
            get :index
            expect(response).to be_successful
        end
    end

    describe "GET #show" do
        let(:location_post) { create(:location_post) }

        it "returns a success response" do
            get :show, params: { id: location_post.id }
            expect(response).to be_successful
        end
    end


    describe "POST #create" do
        let(:user) { create(:user) }

        before do
            @auth_headers = sign_in(user)
            request.headers.merge!(@auth_headers)

            @location_post_params = {
                title: "Test Cafe",
                description: "Test Test Test",
                address: "Test City Test Town",
                user_id: user.id,
                location_image: fixture_file_upload('app/assets/sample_cafe_0.png')
            } 
        end

        it "returns a success response" do
            post :create,
            params: @location_post_params
        end
    end

    describe "PUT #update" do
        let (:user) { create(:user) }
        let (:location_post) { create(:location_post, user: user) }

        before do
            @auth_headers = sign_in(user)
            request.headers.merge!(@auth_headers)

            @location_post_params = {
                    title: "Update Test Cafe",
                    user_id: user.id,
                    location_image: fixture_file_upload('app/assets/sample_cafe_0.png')
                }
        end

        it "returns a success response" do
            put :update, params: { id: location_post.id, location_post: @update_params }
        end
    end


    describe "DELETE #destroy" do
        let (:user) { create(:user) }
        let (:location_post) { create(:location_post,user: user) }

        before do
            @auth_headers = sign_in(user)
            request.headers.merge!(@auth_headers)
        end

        it "returns a success response" do
            delete :destroy, params: { id: location_post.id }
        end
    end

    describe "GET #get_users_posts" do
        let (:user) { create(:user) }
        let (:location_post) { create(:location_post,user: user) }

        before do
            @auth_headers = sign_in(user)
            request.headers.merge!(@auth_headers)
        end

        it "returns a success response" do
            get :get_users_posts, params: { id: user.id }
        end

    end

end