

export const useNotification = () => {

    const notifyBreakTimeAvaliable =  () => {
        new Notification("Finished work",{
            body: "Available time range!!"
          })
    }

    const notifyWorkAvaliable =  () => {
        new Notification("Finished break time",{
            body: "It's time for work!!"
          })
    }

    return { notifyBreakTimeAvaliable, notifyWorkAvaliable }

}