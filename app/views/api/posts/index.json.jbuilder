json.posts @posts, partial: 'api/posts/basic_show', as: :post

json.page @page
json.total_pages @total_pages