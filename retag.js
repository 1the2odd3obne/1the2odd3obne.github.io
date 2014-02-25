(function(window) {

    window.addEventListener('message', function(event) {
        var origin = event.origin,
            data = event.data,
            id;

        try {
            var message = JSON.parse(data);
            id = message.id;

            var op = message.op;
            var bucketName = message.bucketName;
            var bucketValue = message.bucketValue;

            if(op != 'read' && op != 'write')
                throw 'Invalid operation';

            if(!bucketName)
                throw 'No bucketName';

            if(op == 'write')
                localStorage[bucketName] = bucketValue;

            if(parent !== self)
                parent.postMessage(JSON.stringify({ id: id, bucketName: bucketName, bucketValue: localStorage[bucketName] }), origin);

        } catch(e) {
            if(parent !== self)
                parent.postMessage(JSON.stringify({ id: id, error: e.toString() }), origin)
        }
    });

})(window);
