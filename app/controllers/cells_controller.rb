require 'net/http'
class CellsController < ApplicationController
  def search
    case params[:era]
    when "curr"
      @results = Spp.includes(:currents).select(:sciname).where("currents.id = ?", params[:id])
    when "a2100"
      @results = Spp.includes(:a2100s).select(:sciname).where("a2100s.id = ?", params[:id])
    when "b2100"
      @results = Spp.includes(:b2100s).select(:sciname).where("b2100s.id = ?", params[:id])
    end
    #render :title, :layout => false
    #render :search, :layout => false


    @result = {}
    @result["size"] = @results.size.to_s
    #@result["list"] = @results.map(&:sciname).join(', ')
    final = []
    @results.each{|a| 
      final << a.sciname + (a.eol_url.nil? ? "" : "   <a class='url' href='#{a.eol_url}' target='_blank'>EOL</a><img src='images/external-link.gif'>") 
    }
    #@result["list"] = @results.map(&:sciname).join('<br>')
    @result["list"] = final.join('<br>')
    render json: @result
  end



end
