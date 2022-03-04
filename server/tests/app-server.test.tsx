import { API_PREFIX } from '@config/apis/prefix';
import { appServer } from '../src/index';
import ENDPOINT from '@config/apis/endpoint';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';

describe('Check app server connected', () => {
  const request = supertest(appServer.server);

  afterAll(async () => {
    await appServer.stop();
  });

  it(`Test api endpoint ${API_PREFIX + ENDPOINT.TO_DO}`, async () => {
    const response = await request.get(API_PREFIX + ENDPOINT.TO_DO);
    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});
