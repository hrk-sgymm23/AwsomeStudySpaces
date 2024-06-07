FactoryBot.define do
    factory :user do
        name { 'Test' }
        sequence :email do |n|
            "ass#{n}@test.com"
        end
        password { 'password1234' }

    end
end  