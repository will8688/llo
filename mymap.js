var div2;

function addMap(element){
    element.style.height = '400px';
    var div2 = document.createElement("div");
    div2.style.fontFamily = 'Times New Roman, Times, seri';
    div2.style.fontSize = '60px';
    div2.style.fontWeight = 'bold';
    div2.style.textAlign = 'center';
    div2.style.color = '#2B2A26';
    div2.style.position = 'absolute';
    div2.style.left = '50%';
    div2.style.top= '51%';
    var image = document.getElementsByClassName('ProductItem-gallery-slides-item')[1];
    if(image){
        image.appendChild(div2);
    }
    var mapProp= {
        center: new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
        };
        var map = new google.maps.Map(element, mapProp);
        var input = document.createElement("input");
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
        return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
        if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
        }
        var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
        };

        var lng = place.geometry.location.lng();
        var lat = place.geometry.location.lat();
        lng = parseFloat(lng).toFixed(4);
        lat = parseFloat(lat).toFixed(4);
        var deg = String.fromCharCode(176);
        //&deg;
        if(lng < 0 ){
            lng = Math.abs(lng);
            lng = '' + lng + ' '+ deg + ' W';
        }else{
            lng = '' + lng+ ' '+ deg +' E';
        }
        if(lat < 0 ){
            lat = Math.abs(lat);
            lat = '' + lat+ ' '+ deg +' S';
        }else{
            lat = '' + lat + ' '+ deg +' N';
        }

        var lnglat =  lat + ' ' +  lng;
        
        document.getElementById('text-yui_3_17_2_1_1562827623327_248910-field').value = lnglat;
        div2.innerHTML = lat + '<br />' + lng;
        
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
        }));

        if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
        } else {
        bounds.extend(place.geometry.location);
        }
    });
    map.fitBounds(bounds);
    });
}
var hasmap = false;
function myMap() {
    var callback = function(mutationsList, observer) {
      	if(document.body){
            var element = document.querySelectorAll('[id^=section-yui]')[0];
            var in_dom = document.body.contains(element);
            if(in_dom && !hasmap){
                addMap(element);
                hasmap = true;
                observer.disconnect();
            } 
            
        }
    };
    var targetNode = document;

    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true, subtree: true };
    var observe =  function(){
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    observe();
}
