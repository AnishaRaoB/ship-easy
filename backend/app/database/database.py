# load_dotenv() allows us to load ENVIRONMENT VARIABLES (where database url is) from a .env file, so we can use urls for the data.
from dotenv import load_dotenv
# when we get the database url from load_dotenv(), we use os.getenv() to read the database url from the ENVRONMENT VARIABLES. if the database url is not provided, we use a safe fallback to a local SQLite database.
from os
# sqlalchemy is the ORM (Object Relational Mapper) that allows us to interact with the database using Python classes and objects instead of writing raw SQL queries. 
#we use create_engine() to create a connection to the database -- connection config 
from sqlalchemy import create_engine
#declarative_base() to create a base class for our models 
from sqlalchemy.ext.declarative import declarative_base
# sessionmaker() to create a session factory for interacting with the database.
from sqlalchemy.orm import sessionmaker

load_dotenv() # loading .env file into ENVIRONMENT VARIABLES so we can access the database url 

#DATABASE_URL tells SQLAlchemy where the database is located (kind of like an address)and how to connect to it.
# we use getenv() to read the database url from the environment variables. 
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./shipping_risk.db")
#allows SQLite to work with multiple threads that start with sqllite (cause usually it can only access the thread that opened it) so we can use it in a web application with multiple requests. if the database url starts with "sqlite", we set connect_args to {"check_same_thread": False}, otherwise we set it to an empty dictionary. this is necessary because SQLite has a limitation that prevents it from being accessed by multiple threads at the same time.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# create one SQLAlchemy engine so we can open a connection to the database (DATABASE_URL -- taken from.env file) and use it to create a session factory (SessionLocal) and a base class (Base) for our models.
engine = create_engine(DATABASE_URL, connect_args=connect_args)
#SessionLocal creates session objects (like a factorythat are used to interact with the database. we set autocommit=False to disable automatic commit during sessions, autoflush=False to disable automatic sending of changes to the database, and bind=engine to bind the session to the engine we created earlier.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#base class the models will inherit from. it is used to create the tables in the database based on the models we define. we use declarative_base() to create a base class that our models will inherit from, which allows SQLAlchemy to map our Python classes to database tables.
Base = declarative_base()

def create_database():
    # import the models so they register with Base.metadata
    from app.models import product, shipment, historical_shipment  # noqa
    Base.metadata.create_all(bind=engine)

#function that creates a new database session and yields it to the caller. it is used as a dependency in FastAPI routes to provide a database session for each request. we use a try/finally block to ensure that the session is closed after the request is processed, even if an exception occurs.
def get_db():
    db = SessionLocal() #new instance of SessionLocal
    try:
        yield db #use the session that db just made 
    finally:
        db.close() #close the session when your done.
