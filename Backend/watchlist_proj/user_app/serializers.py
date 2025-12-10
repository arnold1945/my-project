from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token
from .models import Client


class ClientSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = Client
        fields = '__all__'
        extra_kwargs = {'password':{'write_only': True}}
    def get_token(self, client):
        token, _ = Token.objects.get_or_create(user=client)
        return token.key
    def create(self, validated_data):
        user = Client.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username', validated_data['email']),
            password=validated_data['password'],
        )
        return user
    
