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

ActiveRecord::Schema.define(version: 20140727154502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.text     "content",                       null: false
    t.integer  "submitter_id",                  null: false
    t.integer  "post_id",                       null: false
    t.integer  "parent_comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "upvotes",           default: 0
    t.integer  "downvotes",         default: 0, null: false
  end

  add_index "comments", ["parent_comment_id"], name: "index_comments_on_parent_comment_id", using: :btree
  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["submitter_id"], name: "index_comments_on_submitter_id", using: :btree
  add_index "comments", ["upvotes"], name: "index_comments_on_upvotes", using: :btree

  create_table "posts", force: true do |t|
    t.string   "title",                      null: false
    t.string   "url"
    t.text     "content"
    t.integer  "sub_id",                     null: false
    t.integer  "submitter_id",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "upvotes",        default: 0
    t.integer  "comments_count", default: 0, null: false
    t.integer  "downvotes",      default: 0, null: false
  end

  add_index "posts", ["sub_id"], name: "index_posts_on_sub_id", using: :btree
  add_index "posts", ["submitter_id"], name: "index_posts_on_submitter_id", using: :btree
  add_index "posts", ["upvotes"], name: "index_posts_on_upvotes", using: :btree

  create_table "subs", force: true do |t|
    t.string   "title",        null: false
    t.string   "description",  null: false
    t.integer  "moderator_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subs", ["moderator_id"], name: "index_subs_on_moderator_id", using: :btree
  add_index "subs", ["title"], name: "index_subs_on_title", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  create_table "votes", force: true do |t|
    t.integer  "user_id",                      null: false
    t.integer  "voteable_id",                  null: false
    t.string   "voteable_type",                null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "vote_type",     default: "up", null: false
  end

  add_index "votes", ["user_id"], name: "index_votes_on_user_id", using: :btree
  add_index "votes", ["voteable_id"], name: "index_votes_on_voteable_id", using: :btree
  add_index "votes", ["voteable_type"], name: "index_votes_on_voteable_type", using: :btree

end
