require "test_helper"

class Api::V1::MusicsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_musics_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_musics_show_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_musics_edit_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_musics_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_musics_destroy_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_musics_update_url
    assert_response :success
  end
end
