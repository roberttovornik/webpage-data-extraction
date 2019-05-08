# HTML data extraction

Extract data from webpage samples of differet types using three different methods:

* regular expressions,
* XPath,
* RoadRunner-like implementation.

## Webpage types
### bolha.com
![bolha.com](data/pages/bolha/bolha1.png)
### rtvslo.si
![rtvslo.si](data/pages/rtvslo.si/rtvslo.png)
### overstock.com
![overstock.com](data/pages/overstock.com/overstock.png)

## Repository structure
Main code resides within [data_extraction.py](code/data_extraction.py) file.

Directory [data/extracted_data/](data/extracted_data/) holds .json files containg structured data extracted from sample web pages.

Sample web pages are located within:

* [data/pages/bolha/](data/pages/bolha/) directory
* [data/pages/overstock.com/](data/pages/bolha/) directory
* [data/pages/rtvslo.si/](data/pages/bolha/) directory





## Installation 
### Prerequisites
Python 3.6/3.7 (tested on linux - Ubuntu 18.04)
Packages used:

* lxml
* re
* json

## Running
Run [data_extraction.py](code/data_extraction.py)

Three methods were implemented to handle data extraction using Regular expressions or XPath:

* __extract_data_bolha__
* __extract_data_rtvslo__
* __extract_data_overstock__

Each of three methods accepts two input parameters:

* __document__
* __method__ (possible values: '_xpath_' or '_regex_')

## Running roadrunner
Run [roadrunner.py](code/roadrunner.py)

Input: 
Appoint __wrapper_page__ to inital page representing our base wrapper. Appoint __sample_page__ to the new page by which the wrapper gets generalized. 

Ouput:
Ufre notation with __#PCDATA__ expressing data fields, __(...)?__ representing optional fields and __(...)+__ representing iterator fields.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
