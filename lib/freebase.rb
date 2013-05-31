require 'cgi'
require 'httparty'
require 'json'

#API_KEY = 'YOUR-API-KEY-GOES-HERE'
API_KEY='AIzaSyBqkRChzl8n0kuROcxSE1XATkHdokRxBz4'
url = 'https://www.googleapis.com/freebase/v1/search'
query = {
  'filter' => '(all type:/music/artist created:"Revolver")',
  'limit' => 10,
  'indent' => true,
  'key' => API_KEY
}
response = HTTParty.get(url, :format => :json, :query => query)
puts response
response['result'].each { |result|
  puts result['name']
}
