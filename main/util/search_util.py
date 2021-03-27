"""Utilities for searching."""
from typing import List

from django.contrib.postgres import search
from django.db.models import QuerySet

from .. import models
from .. import serializers

MATCHING_THRESHOLD = 0.00001


def get_search_results(query: str, user: models.User) -> QuerySet:
    """Gets search results for the user..

    Args:
        query: The raw text query submitted by the user.
        user: The user who submitting the query.

    Returns:
        A list of entities ranked in order to its match to the query.
    """
    search_vectors: List[search.SearchVector] = [
        search.SearchVector('patient_profile__first_name', weight='B'),
        search.SearchVector('patient_profile__last_name', weight='A')
    ]
    combined_search_vector = search_vectors[0]
    for index, vector in enumerate(search_vectors):
        if index == 0:
            continue
        combined_search_vector += vector

    search_query: search.SearchQuery = search.SearchQuery(query)
    users: QuerySet[models.User] = models.User.objects.all()
    return users.annotate(
        rank=search.SearchRank(combined_search_vector, search_query)).filter(
            rank__gte=MATCHING_THRESHOLD).order_by('-rank')


def serialize_results(results: QuerySet):
    serialized_results = []
    for result in results:
        serialized_results.append(
            serializers.UserSerializer(instance=result).data)
    return serialized_results
