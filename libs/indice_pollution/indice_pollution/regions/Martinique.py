# pylint: disable=invalid-name
# pylint: enable=invalid-name
from indice_pollution.regions import EpisodeMixin, ForecastMixin, ServiceMixin


class Service(ServiceMixin):
    is_active = True
    website = 'https://www.madininair.fr/'
    nom_aasqa = "Madininair"


class Forecast(Service, ForecastMixin):
    url = 'https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/Indice_QA/FeatureServer/0/query'
    outfields = ['*']
    params_fetch_all = {
        'where': '1=1',
        'f': 'json',
        'returnGeometry': False,
        'orderByFields': 'ESRI_OID',
        'outFields': '*'
    }

class Episode(Service, EpisodeMixin):
    # pylint: disable-next=line-too-long
    url = 'https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/Episodes_de_pollution_de_la_veille_au_lendemain/FeatureServer/0/query'
    outfields = ['*']
