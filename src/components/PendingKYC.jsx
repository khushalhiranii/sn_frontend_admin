import React from 'react'
import SavingCard from './saving-card'

function PendingKYC() {
  return (
    <div className="overflow-y-visible self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem_1.5rem] min-h-[44.75rem] max-w-full">
                    <SavingCard profilePicture="/ellipse-245@2x.png" />
                    <SavingCard
                    profilePicture="/ellipse-245-1@2x.png"/>
                    <SavingCard
                    profilePicture="/ellipse-245-2@2x.png"/>
                    <SavingCard
                    profilePicture="/ellipse-245-2@2x.png"/>
                    <SavingCard
                    profilePicture="/ellipse-245-2@2x.png"/>
                </div>
  )
}

export default PendingKYC