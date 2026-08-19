from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, JSON, ForeignKey
from datetime import datetime
from database import Base

class FarmerProfileDB(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="Ramesh Patel")
    phone = Column(String(20), default="+91 98765 43210")
    state = Column(String(50), default="Karnataka")
    district = Column(String(50), default="Mandya")
    land_acres = Column(Float, default=4.5)
    soil_type = Column(String(50), default="Red Loam")
    primary_crops = Column(String(200), default="Sugarcane, Paddy, Tomato")
    preferred_language = Column(String(20), default="Kannada")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class CropHistoryDB(Base):
    __tablename__ = "crop_history"

    id = Column(Integer, primary_key=True, index=True)
    n = Column(Float)
    p = Column(Float)
    k = Column(Float)
    temp = Column(Float)
    humidity = Column(Float)
    ph = Column(Float)
    rainfall = Column(Float)
    recommended_crop = Column(String(50))
    confidence = Column(Float)
    top_crops = Column(JSON) # JSON array of top recommendations
    created_at = Column(DateTime, default=datetime.utcnow)

class DiseaseHistoryDB(Base):
    __tablename__ = "disease_history"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String(50))
    disease_name = Column(String(100))
    confidence = Column(Float)
    affected_percentage = Column(Float)
    treatment_organic = Column(Text)
    treatment_chemical = Column(Text)
    image_name = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class PriceHistoryDB(Base):
    __tablename__ = "price_history"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String(50))
    state = Column(String(50))
    current_price = Column(Float)
    predicted_30d_price = Column(Float)
    trend = Column(String(20))
    recommendation = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)

class SchemeMonitorDB(Base):
    __tablename__ = "scheme_monitors"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    category = Column(String(100))
    authority = Column(String(100))
    benefit_summary = Column(Text)
    eligibility = Column(Text)
    documents_required = Column(Text)
    deadline = Column(String(50))
    official_link = Column(String(255))
    is_new = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class ChatLogDB(Base):
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_query = Column(Text)
    detected_language = Column(String(20)) # Kannada, Hindi, English, Hinglish, Kanglish
    bot_response = Column(Text)
    rag_sources = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class CommunityPostDB(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String(100), default="Kisan Partner")
    state = Column(String(50), default="Karnataka")
    district = Column(String(50), default="Mandya")
    crop_tag = Column(String(50), default="General")
    title = Column(String(255))
    content = Column(Text)
    image_url = Column(Text, nullable=True)
    helpful_count = Column(Integer, default=0)
    reports_count = Column(Integer, default=0)
    is_hidden = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class CommunityCommentDB(Base):
    __tablename__ = "community_comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id", ondelete="CASCADE"))
    farmer_name = Column(String(100), default="Kisan Partner")
    comment_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
