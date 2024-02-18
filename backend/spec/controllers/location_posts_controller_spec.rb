require 'rails_helper'

RSpec.describe Api::V1::LocationPostsController, type: :controller do
    describe "GET #index" do
        it "returns a success response" do
            get :index
            expect(response).to be_successful
        end
    end

    describe "GET #show" do
        let(:location_post) { FactoryBot.create(:location_post) }

        it "returns a success response" do
            get :show, params: { id: location_post.id }
            expect(response).to be_successful
        end
    end

end