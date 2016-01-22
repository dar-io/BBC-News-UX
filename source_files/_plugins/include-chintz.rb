require 'yaml'
require 'chintz/parser'

module Jekyll
  class IncludeChintz
    class Tag < Liquid::Tag
      def initialize(tag_name, component, tokens)
        super

        @component = component.strip
      end

      def render(context)
        @site = context.registers[:site]
        @page = context.registers[:page]

        data_file = "#{@site.source}/_data/#{@component}.yaml"
        data = process_data(load_yaml(data_file))
        data['base_url'] = base_url

        chintz = Chintz::Parser.new("#{@site.source}/components")
        chintz.prepare(@component)
        chintz.render(@component, data)
      end

      def load_yaml(path)
        YAML.load(File.read(path))
      end

      def process_data(data)
        case data
          when Hash
            data.each_pair do |key, value|
              data[key] = process_data(value)
            end

          when String
            convert_relative_url(data)

          else data
        end
      end

      def convert_relative_url(path)
        trimmed_path = path.gsub(/^\//, '')

        if is_local_file?(trimmed_path)
          "#{base_url}/#{trimmed_path}"
        else
          path
        end
      end

      def is_local_file?(path)
        File.exists?(File.join(@site.source, path))
      end

      def base_url
        depth = @page['url'].split('/').size - 1

        case depth
          when 1
            '.'

          else
            [].fill('..', 0..(depth-1)).join('/')
        end
      end
    end
  end
end

Liquid::Template.register_tag('include_chintz', Jekyll::IncludeChintz::Tag)
