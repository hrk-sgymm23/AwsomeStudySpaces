namespace :create_sample_data do
    desc "Create Sample Data"
    task create_sample_user_posts: :environment do
        ActiveRecord::Base.transaction do
            begin
                # サンプルアカウント作成
                sample_user = User.find_by(name: "ass-test")
                if sample_user.nil?
                    sample_user = User.create!(
                        email: "ass@test.com",
                        password: "password1234",
                        password_confirmation: "password1234",
                        name: "ass-test"
                    )
                    Rails.logger.info "#{sample_user.name} created!"
                else
                    Rails.logger.info "#{sample_user.name} alredy exist.."
                end

                # サンプルアカウントに紐づく投稿作成
                5.times do |i|
                    sample_location_post = sample_user.location_posts.new(
                        title: "Sample Cafe_#{i}",
                        description: "Sample Description...",
                        address: "Sample Prefecture Sample City",
                        user_id: sample_user.id
                    )
                    
                    sample_image_file = File.open(Rails.root.join("app/assets/sample_cafe_#{i}.png"))
                    sample_location_post.location_image.attach(
                        io: sample_image_file,
                        filename: 'sample_cafe.png',
                        content_type: 'image/png'
                    )
                    sample_location_post.save!
                    Rails.logger.info "#{sample_location_post.title} created!"
                end
            rescue => e
                Rails.logger.error "An error occurred: #{e.message}"
                raise ActiveRecord::Rollback
            end
        end

    end
end
