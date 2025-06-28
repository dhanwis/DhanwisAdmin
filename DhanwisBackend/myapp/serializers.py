from rest_framework import serializers

from myapp.models import Portfolio,Career

from django.contrib.auth.models import User

from dotenv import load_dotenv
import os

load_dotenv()  # <-- Important!

uname = os.getenv("username")

pwd = os.getenv("password")





from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)









class PortfolioSerializer(serializers.ModelSerializer):

    class Meta:

        model=Portfolio

        fields="__all__"

        read_only_fields=["id","owner"]


class CareerSerializer(serializers.ModelSerializer):

    owner=serializers.StringRelatedField()

    class Meta:

        model=Career

        fields="__all__"

        read_only_fields=["id","created_date","updated_date","owner"]
