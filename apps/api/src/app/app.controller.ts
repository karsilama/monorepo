import { Controller, Get, Param, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Retrieves a complete list of all users stored in the MongoDB database. Returns an array of user objects with all available properties.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of all users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          firstName: { type: 'string', example: 'Emily' },
          lastName: { type: 'string', example: 'Johnson' },
          email: { type: 'string', example: 'emily@example.com' },
          phone: { type: 'string', example: '+1-234-567-8900' },
          username: { type: 'string', example: 'emilys' },
          age: { type: 'number', example: 28 },
          gender: { type: 'string', enum: ['male', 'female'], example: 'female' },
          birthDate: { type: 'string', example: '1996-01-15' },
          company: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'TechCorp' },
              department: { type: 'string', example: 'Engineering' },
              title: { type: 'string', example: 'Software Developer' },
            },
          },
          role: { type: 'string', enum: ['admin', 'moderator', 'user'], example: 'user' },
          image: { type: 'string', example: 'https://example.com/avatar.jpg' },
          address: {
            type: 'object',
            properties: {
              address: { type: 'string', example: '123 Main St' },
              city: { type: 'string', example: 'San Francisco' },
              state: { type: 'string', example: 'California' },
              country: { type: 'string', example: 'United States' },
            },
          },
        },
      },
    },
  })
  getUsers(@Req() request: Request) {
    return this.appService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description:
      'Retrieves a specific user by their unique ID. Returns complete user information including personal, professional, and financial data.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the user',
    example: 1,
  })
  @ApiOkResponse({
    description: 'User found and returned successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        firstName: { type: 'string', example: 'Emily' },
        lastName: { type: 'string', example: 'Johnson' },
        email: { type: 'string', example: 'emily@example.com' },
        username: { type: 'string', example: 'emilys' },
        phone: { type: 'string', example: '+1-234-567-8900' },
        age: { type: 'number', example: 28 },
        gender: { type: 'string', example: 'female' },
        birthDate: { type: 'string', example: '1996-01-15' },
        bloodGroup: { type: 'string', example: 'O+' },
        height: { type: 'number', example: 165 },
        weight: { type: 'number', example: 58 },
        eyeColor: { type: 'string', example: 'green' },
        role: { type: 'string', example: 'user' },
        image: { type: 'string', example: 'https://example.com/avatar.jpg' },
        company: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            department: { type: 'string' },
            title: { type: 'string' },
          },
        },
        address: {
          type: 'object',
          properties: {
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: {
                lat: { type: 'number' },
                lng: { type: 'number' },
              },
            },
          },
        },
        bank: {
          type: 'object',
          properties: {
            cardNumber: { type: 'string' },
            cardType: { type: 'string' },
            currency: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User with the specified ID was not found in the database',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'User not found' },
      },
    },
  })
  getUserById(@Param('id') id: number) {
    return this.appService.getUserById(id);
  }
}
