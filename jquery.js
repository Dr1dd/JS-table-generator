       $(function() {
      
  $('.slider').on('input change', function(){
            $(this).next($('.slider_label')).html(this.value);
          });
        $('.rowValue').each(function(){
            var value = $(this).prev().attr('value');
            $(this).html(value);
          });  
})