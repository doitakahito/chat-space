json.array! @new_message.each do |message|
  json.content message.content
  json.image message.image
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name message.user.name
  json.id message.id
end
