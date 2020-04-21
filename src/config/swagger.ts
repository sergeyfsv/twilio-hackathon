export const SwaggerSettings = {
   "swagger": "2.0",
   "info": {
      "version": "1.0.0",
      "title": "nodejsexpressapp API"
   },
   "consumes": [
      "text/plain"
   ],
   "produces": [
      "application/json"
   ],
   "paths": {
      "/health": {
         "get": {
            "operationId": "get",
            "description": "Get health status of nodejsmicroservice",
            "responses": {
               "200": {
                  "description": "Health check response",
                  "schema": {
                     "$ref": "#/definitions/healthResponse"
                  },
                  "examples": {
                     "application/json": {
                        "status": "UP"
                     }
                  }
               }
            }
         }
      }
   },
   "definitions": {
      "healthResponse": {
         "type": "object",
         "properties": {
            "status": {
               "type": "string"
            }
         }
      }
   }
}