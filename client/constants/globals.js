import { Permissions } from 'expo'

export const base_url = 'https://getblimp.co'

export const required_permissions = [
  Permissions.LOCATION,
  Permissions.NOTIFICATIONS
]

export const timed_poll_interval = 45000
export const sig_pos_distance = 30
export const coin_pickup_distance = 8

export const max_accepted_accuracy = 60
