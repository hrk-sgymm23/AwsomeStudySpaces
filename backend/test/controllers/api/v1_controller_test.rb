require "test_helper"

class Api::V1ControllerTest < ActionDispatch::IntegrationTest
  test "should get LocationPosts" do
    get api_v1_LocationPosts_url
    assert_response :success
  end
end
