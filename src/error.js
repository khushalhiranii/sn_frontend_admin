class Error {

    static Send = async ( Err ) => {
        try {
            await fetch(
                'https://flash.blazearcs.space/api/Error-React',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            'Error' : Err,
                        }
                    ),
                }
            );
        } catch {
        };
    };

}

export default Error;