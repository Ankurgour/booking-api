const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Retreat Service API',
    version: '1.0.0',
    description: 'API documentation for the Retreat Service application',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The unique identifier for the user',
          },
          username: {
            type: 'string',
            description: 'The username of the user',
          },
          email: {
            type: 'string',
            description: 'The email of the user',
          },
          phone: {
            type: 'string',
            description: 'The phone number of the user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the user was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the user was last updated',
          },
        },
        required: ['username', 'email', 'phone'],
      },
      Retreat: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The unique identifier for the retreat',
          },
          title: {
            type: 'string',
            description: 'The title of the retreat',
          },
          description: {
            type: 'string',
            description: 'The description of the retreat',
          },
          location: {
            type: 'string',
            description: 'The location of the retreat',
          },
          price: {
            type: 'number',
            format: 'float',
            description: 'The price of the retreat',
          },
          duration: {
            type: 'string',
            description: 'The duration of the retreat',
          },
        },
        required: ['title', 'description', 'location', 'price', 'duration'],
      },
      Booking: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The unique identifier for the booking',
          },
          user_id: {
            type: 'integer',
            description: 'The ID of the user making the booking',
          },
          retreat_id: {
            type: 'integer',
            description: 'The ID of the retreat being booked',
          },
          payment_details: {
            type: 'string',
            description: 'Payment details for the booking',
          },
          booking_date: {
            type: 'string',
            format: 'date',
            description: 'The date of the booking',
          },
        },
        required: ['user_id', 'retreat_id', 'payment_details', 'booking_date'],
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indicates whether the request was successful',
          },
          message: {
            type: 'string',
            description: 'Error message describing what went wrong',
          },
        },
        required: ['success', 'message'],
      },
    },
  },
  paths: {
    '/signup': {
      post: {
        summary: 'Create a new user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    description: 'The username of the new user',
                  },
                  password: {
                    type: 'string',
                    description: 'The password of the new user',
                  },
                  email: {
                    type: 'string',
                    description: 'The email of the new user',
                  },
                  phone: {
                    type: 'string',
                    description: 'The phone number of the new user',
                  },
                },
                required: ['username', 'password', 'email', 'phone'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                    message: {
                      type: 'string',
                    },
                    token: {
                      type: 'string',
                      description: 'Authentication token for the new user',
                    },
                  },
                  required: ['success', 'message', 'token'],
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/login': {
      post: {
        summary: 'Login a user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    description: 'The username of the user',
                  },
                  password: {
                    type: 'string',
                    description: 'The password of the user',
                  },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User logged in successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                    message: {
                      type: 'string',
                    },
                    token: {
                      type: 'string',
                      description: 'Authentication token for the user',
                    },
                  },
                  required: ['success', 'message', 'token'],
                },
              },
            },
          },
          '400': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/booking': {
      post: {
        summary: 'Create a new booking',
        tags: ['Booking'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  retreat_id: {
                    type: 'integer',
                    description: 'The ID of the retreat being booked',
                  },
                  payment_details: {
                    type: 'string',
                    description: 'Payment details for the booking',
                  },
                  booking_date: {
                    type: 'string',
                    format: 'integer',
                    description: 'The date of the booking',
                  },
                },
                required: ['retreat_id', 'payment_details', 'booking_date'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Booking created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    booking: {
                      $ref: '#/components/schemas/Booking',
                    },
                  },
                  required: ['message', 'booking'],
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/retreats': {
      get: {
        summary: 'Retrieve a list of retreats',
        tags: ['Retreats'],
        parameters: [
          {
            in: 'query',
            name: 'filter',
            schema: {
              type: 'string',
            },
            description: 'Filter retreats by type',
          },
          {
            in: 'query',
            name: 'location',
            schema: {
              type: 'string',
            },
            description: 'Filter retreats by location',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            description: 'Search retreats by title or description',
          },
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              default: 1,
            },
            description: 'The page number for pagination',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              default: 10,
            },
            description: 'The number of items per page',
          },
        ],
        responses: {
          '200': {
            description: 'A list of retreats',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Retreat',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
