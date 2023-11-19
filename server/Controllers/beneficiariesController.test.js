const request = require('supertest');
const app = require('../server');
const Beneficiary = require('../Models/beneficiariesModel');
const mongoose = require('mongoose');




beforeAll(async () => {
    // Check if a connection is already established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/testDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });
  
  afterAll(async () => {
    // Close the connection if it's open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });




  describe('POST /newrequest', () => {
    it('should create a new request', async () => {
      const response = await request(app)
        .post('/newrequest')
        .send({
          beneficiarie_description: 'Test Description',
          card_number: 1234567890123456,
          beneficiarie_amount: 100,
          beneficiarie_type: 'TestType',
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.beneficiarie_description).toBe('Test Description');
      // Add more assertions based on your expected behavior
    });
  
    it('should handle errors and return 500 for internal server error', async () => {
      // Mock the save method of the Beneficiary model to simulate an error
      jest.spyOn(Beneficiary.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Simulated error');
      });
  
      const response = await request(app)
        .post('/newrequest')
        .send({
          beneficiarie_description: 'Test Description',
          card_number: 1234567890123456,
          beneficiarie_amount: 100,
          beneficiarie_type: 'TestType',
        });
  
      expect(response.status).toBe(500);
      // Add more assertions based on your expected behavior for error handling
    });
  });