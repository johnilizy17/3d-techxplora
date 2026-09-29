// Comprehensive list of African countries with their states/regions
export const africanCountries = [
  {
    name: "Nigeria",
    states: [
      "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
      "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
      "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
      "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
      "Yobe", "Zamfara"
    ]
  },
  {
    name: "South Africa",
    states: [
      "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo",
      "Mpumalanga", "Northern Cape", "North West", "Western Cape"
    ]
  },
  {
    name: "Kenya",
    states: [
      "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
      "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
      "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos",
      "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
      "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
      "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans-Nzoia", "Turkana", "Uasin Gishu",
      "Vihiga", "Wajir", "West Pokot"
    ]
  },
  {
    name: "Ghana",
    states: [
      "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", "Greater Accra",
      "North East", "Northern", "Oti", "Savannah", "Upper East", "Upper West", "Volta",
      "Western", "Western North"
    ]
  },
  {
    name: "Egypt",
    states: [
      "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia",
      "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor",
      "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia",
      "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"
    ]
  },
  {
    name: "Ethiopia",
    states: [
      "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa", "Gambela",
      "Harari", "Oromia", "Sidama", "Somali", "Southern Nations", "Tigray"
    ]
  },
  {
    name: "Tanzania",
    states: [
      "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
      "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro", "Mtwara",
      "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani", "Rukwa", "Ruvuma",
      "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora", "Tanga", "Zanzibar"
    ]
  },
  {
    name: "Uganda",
    states: [
      "Central", "Eastern", "Northern", "Western"
    ]
  },
  {
    name: "Rwanda",
    states: [
      "Eastern", "Kigali", "Northern", "Southern", "Western"
    ]
  },
  {
    name: "Senegal",
    states: [
      "Dakar", "Diourbel", "Fatick", "Kaffrine", "Kaolack", "Kédougou", "Kolda",
      "Louga", "Matam", "Saint-Louis", "Sédhiou", "Tambacounda", "Thiès", "Ziguinchor"
    ]
  },
  {
    name: "Cameroon",
    states: [
      "Adamawa", "Centre", "East", "Far North", "Littoral", "North", "North-West",
      "South", "South-West", "West"
    ]
  },
  {
    name: "Côte d'Ivoire",
    states: [
      "Abidjan", "Bas-Sassandra", "Comoé", "Denguélé", "Gôh-Djiboua", "Lacs", "Lagunes",
      "Montagnes", "Sassandra-Marahoué", "Savanes", "Vallée du Bandama", "Woroba", "Yamoussoukro", "Zanzan"
    ]
  },
  {
    name: "Other",
    states: ["Not Listed"]
  }
];

// For global use, include all countries
export const allCountries = [
  ...africanCountries.map(c => c.name),
  // Add more as needed
].sort();
