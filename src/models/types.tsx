export type Rocket = {
    id: string
    cost_per_launch: number
    stages: number
    name: string
    type: string
}

export type AddNewRocketProps = {
    handleAddNewRocket: (rocket: Rocket) => void
}

export type RocketActionProps = {
    rocket: Rocket
    handleUpdateRocket: (rocket: Rocket) => void
    handleDeleteRocket: (id: string) => void
}

export type RocketListProps = {
    rocketList: Rocket[]
    handleUpdateRocket: (rocket: Rocket) => void
    handleDeleteRocket: (id: string) => void
}

export type UpdateRocketProps = {
    rocket: Rocket
    handleUpdateRocket: (rocket: Rocket) => void
}