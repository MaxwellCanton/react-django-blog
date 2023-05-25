from rest_framework.pagination import PageNumberPagination

class SetPagination(PageNumberPagination):
    page_query_params = 'b'
    page_size = 10
    max_page_size = 10