import { AnimatePresence, motion }
from "framer-motion";

function Toast({ message }) {

  return (

    <AnimatePresence>

      {message && (

        <motion.div
          className="toast"

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          exit={{
            opacity: 0,
            y: 20
          }}
        >
          {message}
        </motion.div>

      )}

    </AnimatePresence>
  );
}

export default Toast;