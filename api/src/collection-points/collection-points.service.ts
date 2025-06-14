import { Injectable, NotFoundException } from '@nestjs/common'

interface MaintenanceRecord {
	date: string
	status: 'CHEIO' | 'NORMAL' | 'VAZIO'
	notes?: string
}

export interface CollectionPoint {
	id: number
	address: string
	status: 'CHEIO' | 'NORMAL' | 'VAZIO'
	lat: number
	lng: number
	lastMaintenance?: string
	maintenanceHistory?: MaintenanceRecord[]
}

@Injectable()
export class CollectionPointsService {
	private collectionPoints: CollectionPoint[] = [
		{
			id: 1,
			address: 'R. Pion. Odrazil Garcia, 712-680, Floresta - PR, 87120-000',
			lat: -23.603508,
			lng: -52.078509,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-01', status: 'NORMAL', notes: 'Inspeção de rotina' },
				{
					date: '2024-03-10',
					status: 'CHEIO',
					notes: 'Necessita coleta urgente'
				},
				{ date: '2024-03-15', status: 'CHEIO', notes: 'Coleta agendada' }
			]
		},
		{
			id: 2,
			address: 'R. pioneiro Firmino galera Sanches, Floresta - PR, 87120-000',
			lat: -23.602218,
			lng: -52.080174,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-02-28', status: 'VAZIO', notes: 'Ponto limpo' },
				{ date: '2024-03-08', status: 'NORMAL', notes: 'Manutenção preventiva' }
			]
		},
		{
			id: 3,
			address: 'R. Pioneiro David Pavan, Floresta - PR, 87120-000',
			lat: -23.606404,
			lng: -52.078948,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-05', status: 'CHEIO', notes: 'Acúmulo de resíduos' },
				{ date: '2024-03-12', status: 'VAZIO', notes: 'Coleta realizada' }
			]
		},
		{
			id: 4,
			address: 'Rua Tiradentes de Baixo, 271-225, Floresta - PR, 87120-000',
			lat: -23.607847,
			lng: -52.082215,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-03', status: 'NORMAL', notes: 'Sem problemas' },
				{
					date: '2024-03-14',
					status: 'CHEIO',
					notes: 'Volume acima do esperado'
				}
			]
		},
		{
			id: 5,
			address: 'Praça Quinze de Novembro, Floresta - PR, 87120-000',
			lat: -23.609429,
			lng: -52.079748,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-02', status: 'NORMAL', notes: 'Inspeção mensal' }
			]
		},
		{
			id: 6,
			address: 'R. Joaquim Nabuco, 360-394, Floresta - PR, 87120-000',
			lat: -23.609243,
			lng: -52.083867,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-06', status: 'VAZIO', notes: 'Ponto limpo e vazio' }
			]
		},
		{
			id: 7,
			address: 'R. Clóvis Beviláqua, 635-619, Floresta - PR, 87120-000',
			lat: -23.611828,
			lng: -52.082666,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-04', status: 'NORMAL', notes: 'Sem observações' },
				{ date: '2024-03-13', status: 'CHEIO', notes: 'Coleta atrasada' }
			]
		},
		{
			id: 8,
			address: 'Av. Plinio A. Pessoa, 176-198, Floresta - PR, 87120-000',
			lat: -23.610688,
			lng: -52.085434,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-07', status: 'NORMAL', notes: 'Tudo ok' }
			]
		},
		{
			id: 9,
			address: 'R. Ana Neri, 247-181, Floresta - PR, 87120-000',
			lat: -23.612801,
			lng: -52.085842,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-09', status: 'VAZIO', notes: 'Limpeza realizada' }
			]
		},
		{
			id: 10,
			address: 'Floresta, Paraná, 87120-000',
			lat: -23.611966,
			lng: -52.093545,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-11', status: 'CHEIO', notes: 'Solicitar coleta' }
			]
		},
		{
			id: 11,
			address: 'R. projetada 1, Floresta - PR, 87120-000',
			lat: -23.609754,
			lng: -52.0976,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-01', status: 'NORMAL', notes: 'Inspeção' }
			]
		},
		{
			id: 12,
			address: 'Av. Getúlio Vargas, 2295 - Centro, Floresta - PR, 87120-000',
			lat: -23.616322,
			lng: -52.08396,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-08', status: 'VAZIO', notes: 'Ponto limpo' }
			]
		},
		{
			id: 13,
			address: 'R. Pioneiro Antonio Polonio, Floresta - PR, 87120-000',
			lat: -23.617526,
			lng: -52.077798,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-02', status: 'CHEIO', notes: 'Coleta pendente' }
			]
		},
		{
			id: 14,
			address: 'R. Pioneiro Pedro Durante, Floresta - PR, 87120-000',
			lat: -23.620098,
			lng: -52.079188,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-05', status: 'NORMAL', notes: 'Sem observações' }
			]
		},
		{
			id: 15,
			address: 'R. Petúnia, Floresta - PR, 87120-000',
			lat: -23.617211,
			lng: -52.073728,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-06', status: 'VAZIO', notes: 'Limpeza realizada' }
			]
		},
		{
			id: 16,
			address: 'R. Sucuri, Floresta - PR, 87120-000',
			lat: -23.622687,
			lng: -52.068599,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-07', status: 'CHEIO', notes: 'Coleta agendada' }
			]
		},
		{
			id: 17,
			address: 'R. Pioneiro Irineu Pereira Lima, Floresta - PR, 87120-000',
			lat: -23.62729,
			lng: -52.071679,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-08', status: 'NORMAL', notes: 'Inspeção de rotina' }
			]
		},
		{
			id: 18,
			address: 'R. 2001, Floresta - PR, 87120-000',
			lat: -23.611136,
			lng: -52.070958,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-09', status: 'VAZIO', notes: 'Ponto limpo' }
			]
		},
		{
			id: 19,
			address: 'Av. Arapongas, Floresta - PR, 87120-000',
			lat: -23.598567,
			lng: -52.086895,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-10', status: 'CHEIO', notes: 'Volume alto' }
			]
		},
		{
			id: 20,
			address: 'Estr. Apucarana, Floresta - PR, 87120-000',
			lat: -23.60075,
			lng: -52.090081,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-11', status: 'NORMAL', notes: 'Inspeção' }
			]
		},
		{
			id: 21,
			address: 'R. Sibipiruna, 290, Floresta - PR, 87120-000',
			lat: -23.608804,
			lng: -52.075782,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-12', status: 'VAZIO', notes: 'Limpeza realizada' }
			]
		},
		{
			id: 22,
			address: 'R. Beija-Flor, 97-1, Floresta - PR, 87120-000',
			lat: -23.613004,
			lng: -52.077478,
			status: 'CHEIO',
			maintenanceHistory: [
				{ date: '2024-03-13', status: 'CHEIO', notes: 'Coleta pendente' }
			]
		},
		{
			id: 23,
			address: 'R. Alziro Leonardo, Floresta - PR, 87120-000',
			lat: -23.622384,
			lng: -52.077406,
			status: 'NORMAL',
			maintenanceHistory: [
				{ date: '2024-03-14', status: 'NORMAL', notes: 'Inspeção' }
			]
		},
		{
			id: 24,
			address: 'R. Pioneiro Pedro Durante, Floresta - PR, 87120-000',
			lat: -23.621322,
			lng: -52.080195,
			status: 'VAZIO',
			maintenanceHistory: [
				{ date: '2024-03-15', status: 'VAZIO', notes: 'Ponto limpo' }
			]
		}
	]

	findAll(): CollectionPoint[] {
		return this.collectionPoints
	}

	findOne(id: number): CollectionPoint {
		const point = this.collectionPoints.find((point) => point.id === id)
		if (!point) {
			throw new NotFoundException('Collection point not found')
		}
		return point
	}

	create(point: Omit<CollectionPoint, 'id'>): CollectionPoint {
		const newPoint = {
			id: this.collectionPoints.length + 1,
			...point,
			maintenanceHistory: []
		}
		this.collectionPoints.push(newPoint)
		return newPoint
	}

	update(id: number, point: Partial<CollectionPoint>): CollectionPoint {
		const index = this.collectionPoints.findIndex((p) => p.id === id)
		if (index === -1) {
			throw new NotFoundException('Collection point not found')
		}
		this.collectionPoints[index] = {
			...this.collectionPoints[index],
			...point
		}
		return this.collectionPoints[index]
	}

	remove(id: number): boolean {
		const index = this.collectionPoints.findIndex((p) => p.id === id)
		if (index === -1) {
			return false
		}
		this.collectionPoints.splice(index, 1)
		return true
	}
}
