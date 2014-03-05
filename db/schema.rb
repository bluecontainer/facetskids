# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140225170720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "devices", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "devices", ["name"], name: "index_devices_on_name", using: :btree

  create_table "gift_cards", force: true do |t|
    t.string   "code"
    t.decimal  "value"
    t.boolean  "paid"
    t.boolean  "redeemed"
    t.boolean  "coupon_created"
    t.integer  "sender_id"
    t.integer  "receiver_id"
    t.string   "receiver_email"
    t.string   "receiver_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gift_cards", ["receiver_id"], name: "index_gift_cards_on_receiver_id", using: :btree
  add_index "gift_cards", ["sender_id"], name: "index_gift_cards_on_sender_id", using: :btree

  create_table "jobs", force: true do |t|
    t.integer  "video_id"
    t.integer  "zencoder_id"
    t.string   "state"
    t.json     "zencoder_response"
    t.json     "zencoder_request"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "jobs", ["video_id"], name: "index_jobs_on_video_id", using: :btree
  add_index "jobs", ["zencoder_id"], name: "index_jobs_on_zencoder_id", using: :btree

  create_table "mail_lists", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "mail_lists", ["name"], name: "index_mail_lists_on_name", using: :btree

  create_table "outputs", force: true do |t|
    t.integer  "video_id"
    t.integer  "zencoder_id"
    t.string   "state"
    t.string   "label"
    t.json     "zencoder_response"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "outputs", ["video_id"], name: "index_outputs_on_video_id", using: :btree
  add_index "outputs", ["zencoder_id"], name: "index_outputs_on_zencoder_id", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "taggings", force: true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: true do |t|
    t.string "name"
    t.string "description"
    t.string "type"
  end

  create_table "user_stripe_events", force: true do |t|
    t.string   "event_id"
    t.string   "event_type"
    t.json     "event_data"
    t.integer  "user_id"
    t.decimal  "charge_amount"
    t.string   "charge_id"
    t.string   "plan"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_stripe_events", ["user_id"], name: "index_user_stripe_events_on_user_id", using: :btree

  create_table "user_video_views", force: true do |t|
    t.integer  "user_id"
    t.integer  "video_id"
    t.integer  "duration_seconds"
    t.integer  "current_marker_seconds"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_video_views", ["user_id"], name: "index_user_video_views_on_user_id", using: :btree
  add_index "user_video_views", ["video_id"], name: "index_user_video_views_on_video_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "customer_id"
    t.string   "last_4_digits"
    t.integer  "child_age"
    t.boolean  "age_acknowledgement"
    t.boolean  "terms_acknowledgement"
    t.integer  "donation_amt"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.string   "authentication_token"
  end

  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_devices", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "device_id"
  end

  add_index "users_devices", ["user_id", "device_id"], name: "index_users_devices_on_user_id_and_device_id", using: :btree

  create_table "users_mail_lists", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "mail_list_id"
  end

  add_index "users_mail_lists", ["user_id", "mail_list_id"], name: "index_users_mail_lists_on_user_id_and_mail_list_id", using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "videos", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "description"
    t.string   "state"
    t.string   "encoding_identifier"
    t.string   "encoding_extension"
    t.integer  "encoding_size"
    t.string   "preview_identifier"
    t.string   "preview_extension"
    t.integer  "preview_size"
    t.string   "encoding_input_url"
    t.integer  "screen_cap_time_code",   array: true
    t.integer  "duration_in_ms"
    t.string   "origin_country_code",    array: true
    t.string   "audio_language_code",    array: true
    t.string   "subtitle_language_code", array: true
    t.integer  "released_year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "videos", ["user_id"], name: "index_videos_on_user_id", using: :btree

end
