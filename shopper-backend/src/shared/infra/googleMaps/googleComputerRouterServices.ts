import axios from "axios"

interface Route {
  distanceMeters: number;
  duration: string;
}

interface RoutesResponse {
  routes: Route[];
}


export class GoogleComputerRoutesServices {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string){
    this.apiKey = apiKey;
    this.baseUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  }

  async execute(origin: string, destination: string, travelMode: string): Promise<void | RoutesResponse[]> {
    let data = JSON.stringify({
      origin: { address: origin },
      destination: { address: destination },
      travelMode: travelMode
    });

    const config = {
      method: 'post',
      url: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.apiKey,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
      },
      data,
    };


    try {
      const response = await axios.request(config);
      return response.data;

    } catch (error: any) {
      console.error('Error calling Google Routes API:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw new Error('Failed to fetch routes');
    }

  }
}