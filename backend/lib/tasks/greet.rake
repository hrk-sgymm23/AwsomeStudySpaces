namespace :greet do
    desc "say Hello"
    task say_hello: :environment do
        puts "Hello"
    end
end
