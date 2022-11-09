<template>
    <transition name="modal">
        <div>
            <div class="modal-backdrop show"></div>
            <div
                class="modal"
                tabindex="-1"
                role="dialog"
                data-backdrop="static"
                data-keyboard="false"
                aria-labelledby="Modal"
                style="display: block;"
            >
                <div
                    :class="'modal-dialog  modal-dialog-centered ' + modalSizeClasses"
                    role="document"
                >
                    <div class="modal-content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .modal {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .modal-header h4{
        letter-spacing: 2px;
        margin-bottom: 0;
    }

    .modal-backdrop {
        background: rgba(0, 0, 0, .5);
    }

    button.close {
        cursor: pointer;
    }

    /* Transitions */
    .modal-enter-active, .modal-leave-active {
        transition: opacity .3s linear;
    }

    .modal-enter-active .modal, .modal-leave-active .modal,
    .modal-enter-active .modal-backdrop, .modal-leave-active .modal-backdrop {
        transition: opacity .15s linear;
    }

    .modal-enter .modal, .modal-leave-to .modal, .modal-leave-active .modal,
    .modal-enter .modal-backdrop, .modal-leave-to .modal-backdrop, .modal-leave-active .modal-backdrop {
        opacity: 0;
    }

    .modal-enter-active .modal-dialog, .modal-leave-active .modal-dialog {
        transition: transform .3s ease-out;
    }

    .modal-enter .modal-dialog, .modal-leave-to .modal-dialog, .modal-leave-active .modal-dialog {
        transform: translate(0, -25%);
    }
</style>

<script>
import { computed } from 'vue'

export default {
    props: {
        title: {
            default: ''
        },
        modalClasses: {
            default: ''
        },
        size: {
            default: ''
        },
        backdropClose: {
            default: true
        },
        backdropCloseConfirm: {
            default: false
        }
    },
    setup(props,{ emit }) {
        //Computed
        const modalSizeClasses = computed(() => {
            let modalSizes = {
                isSmall: 'modal-sm',
                isLarge: 'modal-lg',
                isXLarge: 'modal-xl'
            }

            return modalSizes[props.size] || ''
        })

        //Methods
        const close = () => emit('close')
        
        return { modalSizeClasses,close }
    }
}
</script>