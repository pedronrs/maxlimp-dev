from dotenv import load_dotenv
import os

load_dotenv()

MIN_PASSWORD_LENGTH = 8
MIN_NAME_LENGTH = 2
ALGORITHM = 'HS256'
MAX_AGE_JWT = 60 * 60 * 24 * 120 # 120 dias em segundos
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY =  os.getenv("SUPABASE_KEY")
