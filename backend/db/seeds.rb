# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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