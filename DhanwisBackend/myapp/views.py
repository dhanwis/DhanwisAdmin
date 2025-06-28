from django.shortcuts import render

from myapp.serializers import PortfolioSerializer,UserSerializer,CareerSerializer

from myapp.models import Portfolio,Career

from rest_framework.response import Response

from rest_framework.views import APIView

from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView,CreateAPIView

from rest_framework import authentication,permissions

from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token

from dotenv import load_dotenv
import os

load_dotenv()  

uname = os.getenv("username")

pwd = os.getenv("password")





class GetToken(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            uname = serializer.validated_data.get("username")
            pwd = serializer.validated_data.get("password")

            user = authenticate(request, username=uname, password=pwd)

            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response(data={"token": token.key}, status=200)

            return Response(data={"message": "Invalid credentials"}, status=401)

        return Response(serializer.errors, status=400)






class PortfolioCreateApiView(CreateAPIView):

    serializer_class=PortfolioSerializer

    queryset=Portfolio.objects.all()

    authentication_classes=[authentication.TokenAuthentication]

    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print("data",self.request.user)
        serializer.save(owner=self.request.user)


class PortfolioListApiView(ListAPIView):

    serializer_class=PortfolioSerializer

    queryset=Portfolio.objects.all()




class PortfolioRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):

    serializer_class=PortfolioSerializer

    queryset=Portfolio.objects.all()

    authentication_classes=[authentication.TokenAuthentication]

    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):

        print("data",self.request.user)

        serializer.save(owner=self.request.user)    




class CareerCreateView(CreateAPIView):

    serializer_class=CareerSerializer

    queryset=Career.objects.all()

    authentication_classes=[authentication.TokenAuthentication]

    permission_classes=[permissions.IsAuthenticated]

    

    def perform_create(self, serializer):
        print("data",self.request.user)
        serializer.save(owner=self.request.user)

class CareerListApiView(ListAPIView):

    serializer_class=CareerSerializer

    queryset=Career.objects.all()


class CareerRetrieveUpdateDistroy(RetrieveUpdateDestroyAPIView):

    serializer_class=CareerSerializer

    queryset=Career.objects.all()

    authentication_classes=[authentication.TokenAuthentication]

    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):

        print("data",self.request.user)

        serializer.save(owner=self.request.user)














