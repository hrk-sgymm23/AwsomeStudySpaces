FactoryBot.define do
    factory :location_post do
        association :user
        title { "サンプル投稿" }
        address { "Test City" }
        description { "test" }
    end
end  