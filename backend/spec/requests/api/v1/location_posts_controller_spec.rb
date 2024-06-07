require 'rails_helper'

describe 'GET /location_posts' do
    it '全件取得' do
        # spec/factories/posts.rbで定義したテストデータを10件複製(配列)
        FactoryBot.create_list(:location_post, 10)
        # /postsのエンドポイントへGETリクエスト
        get 'http://localhost:3001/api/v1/location_posts'
        # 返り値( render json: @posts)を変数に格納
        json = JSON.parse(response.body)

        # リクエスト成功を表す200が返ってきたか確認する。
        expect(response.status).to eq(200)
        # 10件のデータが返ってきているかを確認
        expect(json.length).to eq(10)
    end
end

describe 'GET /location_posts/:id' do
    it '特定の投稿を取得する' do
        # テストデータを1件作成
        post = create(:location_post, title: "hokeCafe", description: "良い", address:"五反田")
        # /posts/#{post.id}へGETリクエスト
        get "http://localhost:3001/api/v1/location_posts/#{post.id}"
        # 返り値を変数へ格納
        json = JSON.parse(response.body)
        # リクエスト成功を表す200が返ってきたか確認する。
        expect(response.status).to eq(200)
        # テストデータで作成した値が返ってきているかを確認
        expect(json["title"]).to eq(post["title"])
        expect(json["description"]).to eq(post["description"])
        expect(json["address"]).to eq(post["address"])
    end
end

describe 'Post /location_posts' do
    # リクエストで送られてくるテストデータ
    before do
        @location_post_create_params = {
            location_post: {
                title: "hokeCafe",
                description: "良い",
                address:"五反田"
            }
        }
    end
    it '新しい投稿を作成する' do
        # 受け取ったテストデータをパラメタとし新規作成
        # Postデータが作成されているかをテスト(件数が1つ増えているか)
        expect { 
            post 'http://localhost:3001/api/v1/location_posts', 
            params: @location_post_create_params
        }
        .to change(LocationPost, :count).by(+1)
        expect(response.status).to eq(201)
    end
end

describe "PUT /location_posts/:id" do
    it '投稿の更新' do
        # 更新対象のテストデータを作成
        location_post = create(:location_post, title: "hokeCafe", description: "良い", address:"五反田")
        # 更新用のリクエストデータ
        @location_post_update_params = {
            location_post: {
                title: "hakeCafe",
                description: "良い",
                address:"五反田"
            }
        }
        # PUTリクエスト
        put "http://localhost:3001/api/v1/location_posts/#{location_post.id}", params: @location_post_update_params
    
        expect(response.status).to eq(200)
        # 更新後のデータとリクエストデータが一致しているかを確認
        expect(location_post.reload.title).to eq(@location_post_update_params[:location_post][:title])
    end
end

describe 'Delete /posts/:id' do
    it '記事をを削除する' do
        # テストデータを1件削除
        location_post = create(:location_post, title: "hokeCafe", description: "良い", address:"五反田")
        # DLETEにリクエストを送る
        # 作成したテストデータが削除されている事を確認
        expect { delete "http://localhost:3001/api/v1/location_posts/#{location_post.id}" }.to change(LocationPost, :count).by(-1)
        # リクエスト成功を表す204が返ってきたか確認する。
        expect(response.status).to eq(204)
    end
end
