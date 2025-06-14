import { Injectable, NotFoundException } from '@nestjs/common'

interface MaintenanceRecord {
	date: string
	status: 'cheio' | 'normal' | 'vazio'
	notes?: string
}

export interface CollectionPoint {
	id: number
	address: string
	status: 'cheio' | 'normal' | 'vazio'
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
			address: 'Rua Paraná, 1000 - Centro',
			status: 'cheio',
			lat: -23.6033,
			lng: -52.0806,
			lastMaintenance: '2024-03-15',
			maintenanceHistory: [
				{
					date: '2024-03-15',
					status: 'cheio',
					notes: 'Ponto necessita de coleta urgente'
				}
			]
		},
		{
			id: 2,
			address: 'Rua São Paulo, 500 - Vila Nova',
			status: 'normal',
			lat: -23.6015,
			lng: -52.0823,
			lastMaintenance: '2024-03-14',
			maintenanceHistory: [
				{
					date: '2024-03-14',
					status: 'normal',
					notes: 'Manutenção preventiva realizada'
				}
			]
		},
		{
			id: 3,
			address: 'Rua Rio de Janeiro, 750 - Jardim América',
			status: 'vazio',
			lat: -23.6056,
			lng: -52.0789,
			lastMaintenance: '2024-03-13',
			maintenanceHistory: [
				{
					date: '2024-03-13',
					status: 'vazio',
					notes: 'Ponto esvaziado e limpo'
				}
			]
		},
		{
			id: 4,
			address: 'Rua Santa Catarina, 300 - Vila São Paulo',
			status: 'normal',
			lat: -23.5998,
			lng: -52.0845
		},
		{
			id: 5,
			address: 'Rua Minas Gerais, 450 - Vila Nova',
			status: 'cheio',
			lat: -23.6021,
			lng: -52.0812
		},
		{
			id: 6,
			address: 'Rua Bahia, 600 - Centro',
			status: 'vazio',
			lat: -23.6043,
			lng: -52.0798
		},
		{
			id: 7,
			address: 'Rua Pernambuco, 350 - Jardim América',
			status: 'normal',
			lat: -23.6009,
			lng: -52.0834
		},
		{
			id: 8,
			address: 'Rua Ceará, 800 - Vila São Paulo',
			status: 'cheio',
			lat: -23.6015,
			lng: -52.0856
		},
		{
			id: 9,
			address: 'Rua Amazonas, 250 - Vila Nova',
			status: 'normal',
			lat: -23.6038,
			lng: -52.0819
		},
		{
			id: 10,
			address: 'Rua Goiás, 550 - Centro',
			status: 'vazio',
			lat: -23.6027,
			lng: -52.0801
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
