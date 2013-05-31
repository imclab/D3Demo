require 'httparty'
require 'json'
require 'addressable/uri'

class FreebaseController < ApplicationController
  
  API_KEY = 'YOUR-API-KEY-GOES-HERE'
  
  def index
    @filter = '(all appears_in:"star wars")'
  end
  
  def search    
   url = Addressable::URI.parse('https://www.googleapis.com/freebase/v1/search')
    url.query_values = {
      'query' => params[:query],
      'filter' => params[:filter],
      'limit' => 10,
      'indent' => 'true',
      'key' => API_KEY
    }
    
    response = HTTParty.get(url, :format => :json)
    logger.debug(response.body)
    @results = JSON.parse(response.body)    
  end
  
end
